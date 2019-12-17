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


async def get_indices_handler(request):
    """
    :param request: aiohttp request
    :return: aiohttp Response object
    """
    app = request.app
    es_url = app['es_url']
    indices: List[Dict] = await _get_request(es_url + '/_cat/indices?format=json')
    mapping: Dict = await _get_request(es_url + '/_mapping')
    aliases: Dict = await _get_request(es_url + '/_aliases')

    res = []
    for index_info in indices:
        index = index_info.get('index')
        mappings = mapping.get(index, {}).get('mappings', {})
        metadata = mappings.get('_meta', mappings.get('doc', {}).get('_meta'))  # older Elasticsearch versions support
        alias = [*aliases.get(index, {}).get('aliases', {})]
        res.append({**index_info, **metadata, **{'aliases': alias}})

    response = {
        'data': res,
        'page': 1,
        'total': 1
    }
    return web.json_response(response)
