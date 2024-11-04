pipeline {
    agent any

     environment {
        MONGODB_URL=mongodb+srv://root:root@cluster0.xvril.mongodb.net/laboratorionosql?retryWrites=true&w=majority&appName=Cluster0
    }
    
    stages {
        stage('Build') {
            steps {
                bat 'npm install'
            }
        }
        stage('Test') { 
            steps {
                bat 'npm run test' 
            }
        }
    }
}
