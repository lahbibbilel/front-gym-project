pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the Git repository
                git 'https://github.com/lahbibbilel/front-gym-project.git'
            }
        }

        stage('Build') {
            steps {
                // Install pm2 globally if not already installed
                sh 'npm install -g pm2'

                // Navigate to your project directory
                sh 'cd /var/lib/jenkins/workspace/Freestyle_for_angular'

                // Run necessary commands for your Angular project
                sh 'export NODE_OPTIONS=--max_old_space_size=4096'
                sh 'npm install'
                sh 'ng build'

                // Check if PM2 is already running
                sh 'if pm2 -v > /dev/null 2>&1; then pm2 start npm --name "front-gym-project" -- start; else npm install pm2 -g && pm2 start npm --name "front-gym-project" -- start; fi'

                // Restart the application using pm2
                sh 'pm2 restart all'
            }
        }
    }
}
