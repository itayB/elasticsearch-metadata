FROM python:3.8-alpine
RUN apk --update add --no-cache g++  # 150MB! we can do better than that..
COPY /server /server
WORKDIR /server
RUN pip install -r requirements.txt
COPY /build /build
CMD ["python", "main.py"]
