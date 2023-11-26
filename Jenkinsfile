pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM',
                          branches: [[name: '*/master']],
                          userRemoteConfigs: [[url: 'https://github.com/lahbibbilel/front-gym-project.git']]])
            }
        }

        stage('Install and Build') {
            steps {
                sh 'npm install'
                sh 'ng build --prod'
            }
        }

        stage('Restart with PM2') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'pm2 restart all'
                    } else {
                        bat 'pm2 restart all'
                    }
                }
            }
        }
    }
}
