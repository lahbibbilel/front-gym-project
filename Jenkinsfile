pipeline {
    agent any

    tools {
        nodejs 'Nodejs_auto' // Name of the NodeJS installation configured in Jenkins
    }

    stages {
        stage('Checkout SCM') {
            steps {
                git branch: 'master', url: 'https://github.com/lahbibbilel/front-gym-project.git'
            }
        }

        stage('Install node modules') {
            steps {
                script {
                    def nodejsHome = tool name: 'Nodejs_auto', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    def npmHome = "${nodejsHome}/bin/npm"
                    sh "${npmHome} install"
                }
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
