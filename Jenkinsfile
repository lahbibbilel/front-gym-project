pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/lahbibbilel/front-gym-project.git'
            }
        }

        stage('Build') {
            environment {
                PATH = "$PATH:/path/to/npm"
            }
            steps {
                sh 'npm install -g pm2'
                sh 'export NODE_OPTIONS=--max_old_space_size=4096'
                sh 'npm install'
                sh 'ng build'

                sh 'pm2 -v' // Test if PM2 is installed and accessible
                sh 'pm2 restart all'
            }
        }
    }
}
