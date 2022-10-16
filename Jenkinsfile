pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                // Move these out to the installer script and run it here instead
//                sh "cp patient_information_management/installer.sh ."
//                sh "chmod u+x installer.sh"
//                sh "./installer.sh"
//                sh "rm package.json"
//                sh "rm package-lock.json"
                sh "cat requirements.txt | npm install -g --save-dev"
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
