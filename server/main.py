from aiohttp import web
from aiohttp.web_app import Application
from handlers.get_indices_handler import get_indices_handler
from configuration import ELASTICSEARCH_HOST, ELASTICSEARCH_PORT

STATIC_WEB_PATH = '../build'


async def get_index(request):
    return web.FileResponse(STATIC_WEB_PATH + '/index.html')


def main():
    """
    main function
    """
    app: Application = web.Application()
    app['es_url'] = 'http://' + ELASTICSEARCH_HOST + ':' + str(ELASTICSEARCH_PORT)
    app.add_routes([
        # web.get('/', get_status_handler),
        web.get('/api/v1/indices', get_indices_handler),
        web.get('/', get_index),  # redirect to homepage
        web.static('/', STATIC_WEB_PATH)
    ])
    web.run_app(app, port=8080)


if __name__ == '__main__':
    main()
