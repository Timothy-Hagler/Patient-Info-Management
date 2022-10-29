pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                // Move these out to the installer script and run it here instead
//                sh "chmod u+x patient_information_management/installer.sh"
//                sh "./patient_information_management/installer.sh"
//                sh "chmod u+x installer.sh"
//                sh "./installer.sh"
//                sh "rm package.json"
//                sh "rm package-lock.json"
//                sh "sudo npm install -g --save-dev react --unsafe-perm=true --allow-root"
//                sh "cat requirements.txt | sudo npm install -g --save-dev --unsafe-perm=true --allow-root"
                sh 'cd patient_information_management/ && npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'pwd'
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
