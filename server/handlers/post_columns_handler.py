from typing import List, Dict
from aiohttp import web, ClientSession


INDEX_NAME = '.es-metadata'


async def _head_request(url):
    async with ClientSession() as session:
        async with session.get(url) as response:
            return response.status == 200


async def _put_request(url, json=None):
    async with ClientSession() as session:
        async with session.put(url, json=json) as response:
            return response.status == 200


async def post_columns_handler(request):
    """
    :param request: aiohttp request
    :return: aiohttp Response object
    """
    app = request.app
    es_url = app['es_url']
    index_exist: List[Dict] = await _head_request(es_url + '/' + INDEX_NAME)
    if not index_exist:
        index_settings = {
            'settings': {
                'number_of_shards': 1,
                'number_of_replicas': 0
            }
        }
        await _put_request(es_url + '/' + INDEX_NAME, json=index_settings)

    # add columns document

    response = {
        'data': index_exist,
        'page': 1,
        'total': 1
    }
    return web.json_response(response)
