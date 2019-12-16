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
    res = await _get_request(es_url + '/_cat/indices?format=json')

    response = {
        'data': res,
        'page': 1,
        'total': 1
    }
    return web.json_response(response)
