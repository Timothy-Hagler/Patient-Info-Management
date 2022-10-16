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
                sh "sudo npm install -g --save-dev react --unsafe-perm=true --allow-root"
                sh "cat requirements.txt | sudo npm install -g --save-dev --unsafe-perm=true --allow-root"
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
