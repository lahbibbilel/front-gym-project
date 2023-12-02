pipeline {
    agent any

    tools {
        nodejs 'Nodejs_auto'
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
                    sh "export NODE_OPTIONS=--max_old_space_size=4096 && ${ngHome} build"
                }
            }
        }

        stage('Install and Start HTTPD') {
            steps {
                // Install httpd (Apache)
                sh 'sudo yum install -y httpd'

                // Start httpd (Apache)
                sh 'sudo systemctl start httpd'
            }
        }

        stage('Deploy to httpd') {
            steps {
                // Create the directory if it doesn't exist
                sh 'sudo mkdir -p /var/www/html/'

                // Copy files to the destination
                sh 'sudo cp -r dist/front-gym-project/* /var/www/html/'
            }
        }
    }
}
