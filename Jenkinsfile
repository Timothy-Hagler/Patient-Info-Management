pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                // Move these out to the installer script and run it here instead
                sh "chmod u+x patient_information_management/installer.sh"
                sh "./patient_information_management/installer.sh"
            }
        }
        stage('Test') {
            steps {
                sh 'npm --prefix patient_information_management/ test a'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
