pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh "npm install react-scripts"
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh 'ls -la'
                sh 'npm --prefix patient_information_management/ test a'
                sh 'q'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
