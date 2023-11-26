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
                script {
                    def nodejsHome = tool name: 'Nodejs_auto', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    def ngHome = "${nodejsHome}/bin/ng"
                    // Increase the heap memory for the ng build command
                    def ngBuildCmd = "${ngHome} build --max_old_space_size=4096" // You can adjust the memory size as needed
                    sh ngBuildCmd
                }
            }
        }

        stage('PM2 Restart') {
            steps {
                sh 'pm2 restart all'
            }
        }
    }
}
