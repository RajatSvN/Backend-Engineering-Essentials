from flask import Flask, Response, stream_with_context
from flask_pymongo import PyMongo

app = Flask(__name__)

# replace with your mongodb URI
mongodb_client = PyMongo(app, uri="mongodb://localhost:27017/Huge-Data-Sample-DB")
db = mongodb_client.db

'''
utility method to calculate how many records to skip and how many records to fetch based on current page 
number and records per page respectively, typical pagination functionality
'''


def get_record_by_skips(records_per_page, current_page_number):

    # calculate how many records to skip
    records_to_skip = records_per_page * (current_page_number - 1)

    # skip records and limit records per page
    cursor = db.movies.find().skip(records_to_skip).limit(records_per_page)

    # return list of records
    return [record for record in cursor]


@app.route('/')
def index():
    record = db.movies.find_one({"director": "Fincher"})
    return {'name': record['name'], 'director': record['director'], 'imdb': record['imdb']}


@app.route('/stream/<int:records_per_page>/<int:record_count>')
def stream(records_per_page, record_count):
    # calculate total number of pages
    total_pages = record_count // records_per_page

    # generator to stream data
    def batch_data_generator():

        current_record_count = 0

        # fetch data page wise
        for page_num in range(total_pages):

            records = get_record_by_skips(records_per_page, page_num + 1)

            # yield current page record data as bytes
            for record in records:
                current_record_count = current_record_count + 1
                name = record['name']
                director = record['director']
                imdb = record['imdb']
                yield f"(record_number:{current_record_count}, name:{name}, director:{director}, imdb:{imdb})\n"

    return Response(stream_with_context(batch_data_generator()))
