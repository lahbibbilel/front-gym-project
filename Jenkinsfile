pipeline {
    agent any

    stages {
        stage('Checkout SCM') {
            steps {
                git branch: 'master', url: 'https://github.com/lahbibbilel/front-gym-project.git'
            }
        }

        stage('Install node modules') {
            steps {
                sh 'npm install'
            }
        }

        stage('Angular Build') {
            steps {
                sh 'ng build'
            }
        }

        stage('PM2 Restart') {
            steps {
                sh 'pm2 restart all'
            }
        }
    }
}
