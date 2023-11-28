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

                    // Start the Angular project on port 4200 with localhost
                    def ngServe = "${ngHome} serve --port 4200 --host localhost --disable-host-check"
                    sh "export NODE_OPTIONS=--max_old_space_size=4096 && ${ngServe} &"
                    sleep 180 // Wait for 3 minutes (or a reasonable time to test server execution)

                    // Stop the Angular server using pkill
                    sh "pkill -f 'ng serve'"
                }
            }
        }
    }
}
