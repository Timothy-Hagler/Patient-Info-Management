pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'cd patient_information_management/ && npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'cd patient_information_management/ && npm test a'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
