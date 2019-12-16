import copy
import asyncio
from aiohttp import ClientSession

data = [
    {
        'index': 'e_1000_1575980464585',
        'alias': 'serving_1000',
        'eCommerceId': 1000,
        'eCommerceName': 'Nike',
        'name': 'Nike Production',
        'tier': 1,
        'url': 'https://www.nike.com/',
        'logo': 'https://www.nike.com/favicon.ico'
    },
    {
        'index': 'e_1001_1575980464585',
        'alias': 'serving_1001',
        'eCommerceId': 1001,
        'eCommerceName': 'Under Armour',
        'name': 'Under Armour Production',
        'tier': 1,
        'url': 'https://www.underarmour.com/',
        'logo': 'https://www.underarmour.com/favicon.ico'
    },
    {
        'index': 'e_1002_1575980464585',
        'alias': 'serving_1002',
        'eCommerceId': 1002,
        'eCommerceName': 'Samsung',
        'name': 'Samsung Production',
        'tier': 1,
        'url': 'https://www.samsung.com/',
        'logo': 'https://www.samsung.com/favicon.ico'
    },
]


async def fetch(url, payload, session):
    async with session.put(url, json=payload) as response:
        return await response.json()


async def bound_fetch(sem, url, payload, session):
    # Getter function with semaphore.
    async with sem:
        await fetch(url, payload, session)


async def main():
    sem = asyncio.Semaphore(100)
    url = 'http://localhost:9200'
    payload = {
        'mappings': {
            '_meta': {}
        },
        'settings': {
            'number_of_shards': 1,
            'number_of_replicas': 0
        },
    }

    async with ClientSession() as session:
        tasks = []
        for index_data in data:
            request_payload = copy.deepcopy(payload)
            request_payload['mappings']['_meta'] = index_data
            task = asyncio.ensure_future(bound_fetch(sem, url + '/' + index_data.get('index'), request_payload, session))
            tasks.append(task)

        responses = asyncio.gather(*tasks)
        await responses


if __name__ == '__main__':
    asyncio.run(main())
