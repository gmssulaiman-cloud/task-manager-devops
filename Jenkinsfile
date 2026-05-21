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
                sh '''
                docker run --rm \
                -e SONAR_HOST_URL="http://host.docker.internal:9000" \
                -e SONAR_TOKEN="sqp_eef18d06c9bc9edb75994722ab3f168e267efd37" \
                -v $(pwd):/usr/src \
                sonarsource/sonar-scanner-cli \
                -Dsonar.projectKey=task-manager-api \
                -Dsonar.projectName=task-manager-api \
                -Dsonar.sources=/usr/src \
                -Dsonar.exclusions=**/node_modules/**,**/coverage/**
                '''
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
        sh '''
        sleep 10
        docker exec task-api-container curl http://localhost:3000/health
        '''
            }
        }
    }
}