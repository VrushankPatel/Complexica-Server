# Complexica-Server

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-black.svg)](https://sonarcloud.io/summary/new_code?id=VrushankPatel_Complexica-Server)

| Metric                     | Badge                                                                                                                                                                                                                      |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bugs**                   | [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=VrushankPatel_Complexica-Server&metric=bugs)](https://sonarcloud.io/summary/new_code?id=VrushankPatel_Complexica-Server)                                 |
| **Code Smells**            | [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=VrushankPatel_Complexica-Server&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=VrushankPatel_Complexica-Server)                   |
| **Duplicated Lines**       | [![Duplicated Lines](https://sonarcloud.io/api/project_badges/measure?project=VrushankPatel_Complexica-Server&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=VrushankPatel_Complexica-Server) |
| **Maintainability Rating** | [![Maintainability](https://sonarcloud.io/api/project_badges/measure?project=VrushankPatel_Complexica-Server&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=VrushankPatel_Complexica-Server)              |
| **Quality Gate Status**    | [![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=VrushankPatel_Complexica-Server&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=VrushankPatel_Complexica-Server)                 |
| **Reliability Rating**     | [![Reliability](https://sonarcloud.io/api/project_badges/measure?project=VrushankPatel_Complexica-Server&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=VrushankPatel_Complexica-Server)            |
| **Security Rating**        | [![Security](https://sonarcloud.io/api/project_badges/measure?project=VrushankPatel_Complexica-Server&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=VrushankPatel_Complexica-Server)                  |
| **Vulnerabilities**        | [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=VrushankPatel_Complexica-Server&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=VrushankPatel_Complexica-Server)           |
| **Technical Debt**         | [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=VrushankPatel_Complexica-Server&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=VrushankPatel_Complexica-Server)                |

---

## Overview

**Complexica-Server** is a Flask-based application designed to utilize machine learning models for image colorization. Leveraging Intel OpenVINO for optimized inference, the server takes grayscale images as input and outputs fully colorized images, enabling seamless integration of AI-powered image enhancement.

### Features
- **Colorization Engine**: Trained using the Flickr30k dataset based fine-tuned model for high-quality results.
- **Optimized Deployment**: Enhanced wsgi based build powered by OpenVINO for efficient inference on Intel hardware.
- **Ready for Deployment**: Easily deployable on local machines with docker or Heroku with minimal configuration.

---

## Getting Started

### Prerequisites
- Python 3.8+
- Flask
- Intel OpenVINO Toolkit (optional for local inference)

### Installation

**Run the docker image directly**:
   ```bash
   docker run -p 9090:9090 vrushankpatel5/complexica-server:1.0
   ```

### OR

**Docker compose**
```yaml
version: '3.8'

services:
  complexica-server:
    image: vrushankpatel5/complexica-server:1.0
    container_name: complexica-server
    ports:
      - "9090:9090"
    restart: always
```
### OR

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/VrushankPatel/Complexica-Server.git
   cd Complexica-Server
   ```

2. **Set Up Virtual Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # For Linux/Mac
   venv\Scripts\activate    # For Windows
   ```

3. **Install Requirements**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Download the Pretrained Model**:
   - The pre-trained Caffe model can be downloaded from [this link](https://drive.google.com/file/d/1Vhv1iuV8QiSBs1OgCxlC9hFfej-QwwOW/view?usp=sharing).
   - Place the model file in the `src/model` directory.

5. **Run the Application**:
   ```bash
   flask run
   ```

### Deployment on Heroku
Refer to the `deploy-instructions.txt` file for step-by-step deployment on Heroku.

---

## API Endpoints

### Colorization Endpoint
**POST** `/api/upload_image`
- **Request**: Upload a grayscale image in `.jpg` or `.png` format.
- **Response**: Returns a colorized image in the same format.

---

## Directory Structure
```
Complexica-Server/
├── src/
│   ├── model/           # Pretrained models
│   ├── static/          # Static assets
│   ├── templates/       # HTML templates (if any)
│   └── app.py           # Main Flask application
├── requirements.txt     # Python dependencies
├── deploy-instructions.txt # Heroku deployment steps
└── README.md            # Project documentation
```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments
- **Intel OpenVINO Toolkit** for model optimization.
- **Flickr30k Dataset** for training the colorization model.
- Community contributors and developers.
