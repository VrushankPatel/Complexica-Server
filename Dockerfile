# Use the Python 3.12.3 bullseye image
FROM python:3.12.3-bullseye

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies for OpenCV and Pillow
RUN apt-get update && apt-get install -y \
    zlib1g-dev \
    libjpeg-dev \
    libpng-dev \
    gcc \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip to the latest version
RUN pip install --upgrade pip

# Copy the requirements.txt file into the container
COPY requirements.txt .

# Install the dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the src, web, app.py, and wsgi.py files into the container
COPY src/ /app/src/
COPY web/ /app/web/
COPY app.py /app/
COPY wsgi.py /app/

# Expose port 9090
EXPOSE 9090

# Run the Python app
CMD ["python", "app.py"]
