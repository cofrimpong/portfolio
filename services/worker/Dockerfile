FROM python:3.11-slim

WORKDIR /app

COPY services/worker-service/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY services/worker-service/app ./app
COPY shared ./shared

EXPOSE 8003

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8003"]
