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

        stage('Run Angular Project') {
            steps {
                script {
                    def nodejsHome = tool name: 'Nodejs_auto', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    def ngHome = "${nodejsHome}/bin/ng"

                    // Lancer le projet Angular avec le port 4200
                    sh "export NODE_OPTIONS=--max_old_space_size=4096 && ${ngHome} serve --port 4200 --host 0.0.0.0 --disable-host-check"
                }
            }
        }
    }
}
