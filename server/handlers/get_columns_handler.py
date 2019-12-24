from typing import List, Dict

from aiohttp import web, ClientSession


async def _get_request(url):
    async with ClientSession() as session:
        async with session.get(url) as response:
            if response.status == 200:
                res = await response.json()
            else:
                res = {
                    'status': 'error'
                }
            return res


async def get_columns_handler(request):
    """
    :param request: aiohttp request
    :return: aiohttp Response object
    """
    app = request.app
    es_url = app['es_url']
    response: Dict = await _get_request(es_url + '/.es-metadata/_doc/fields')
    columns = response.get('_source', {}).get('columns', [])
    response = {
        'columns': columns
    }
    return web.json_response(response)
