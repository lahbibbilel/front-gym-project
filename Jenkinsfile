node {

    stages {
        stage('Checkout SCM') {
                git branch:'master', url 'https://github.com/lahbibbilel/front-gym-project.git'

        }

        stage('Install node modules') {

                sh 'npm install'
            }
        stage('Build') {

                 sh 'ng build'
             }
        stage('Build') {

                 sh 'pm2 restart all'
               }
 }
}
