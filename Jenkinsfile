pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh "npm install --save-dev react-scripts"
                sh "npm install --save-dev jest"
                sh "npm install --save-dev @testing-library/jest-dom"
                sh "npm install --save-dev mysql"
            }
        }
        stage('Test') {
            steps {
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
