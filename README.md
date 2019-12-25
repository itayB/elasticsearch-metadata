![Build][docker-build]
![Docker Pulls][docker-pulls]

<!-- MARKDOWN LINKS & IMAGES -->
[docker-build]: https://github.com/itayb/elasticsearch-metadata/workflows/Push%20to%20Master%20CI/badge.svg
[docker-pulls]: https://img.shields.io/docker/pulls/itayb/elasticsearch-metadata.svg

# Elasticsearch-metadata

Elasticsearch web management tool.

## Usage
Usage with docker:
```bash
docker run -p 8080:8080 itayb/elasticsearch-metadata
```
In your browser goto http://localhost:8080

Usage with docker-compose and Elasticsearch 7.5:
```bash
docker-compose up -d
```


