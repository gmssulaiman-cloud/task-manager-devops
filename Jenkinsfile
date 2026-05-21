pipeline {
    agent any

    environment {
        IMAGE_NAME = "task-api"
    }

    stages {

        stage('Build') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'SonarQube analysis stage'
            }
        }

        stage('Security Scan') {
            steps {
                sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image $IMAGE_NAME'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker rm -f task-api-container || true
                docker run -d --name task-api-container -p 3000:3000 $IMAGE_NAME
                '''
            }
        }

        stage('Release') {
            steps {
                sh 'git tag v1.${BUILD_NUMBER} || true'
            }
        }

        stage('Monitoring') {
            steps {
                sh 'curl http://localhost:3000/health'
            }
        }
    }
}