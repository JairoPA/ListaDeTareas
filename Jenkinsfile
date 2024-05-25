pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/usuario/repositorio.git'
        BRANCH = 'main'
        NODEJS_VERSION = '22.2.0'
    }

     stages {
        stage('Checkout') {
            steps {
                git branch: "${env.BRANCH}", url: "${env.REPO_URL}"
            }
        }

        stage('Install dependencies') {
            steps {
                script {
                    def npmCMD = tool 'NodeJS'
                    sh "${npmCMD}/bin/npm install"
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    def npmCMD = tool 'NodeJS'
                    sh "${npmCMD}/bin/npm run build"
                }
            }
        }

       stage('Deploy') {
          steps {
            // Copiar los archivos de la aplicación al servidor local
            sh "scp -r /var/www/jenkins user@localhost:/ruta/del/servidor"
        
            // Reiniciar la aplicación en el servidor local si es necesario
            sh "ssh user@localhost 'pm2 restart nombre_de_la_aplicacion'"
          }
        }
     }

    post {
        always {
            // Configurar notificaciones por correo electrónico con contenido HTML
            emailext (
                to: 'jpreciado24@ucol.mx',
                subject: "Notificación de Construcción: ${env.JOB_NAME} [${env.BUILD_NUMBER}]",
                body: '''<!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Correo de Notificación</title>
                </head>
                <body>
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #333;">Notificación de Construcción</h2>
                        <p>Hola,</p>
                        <p>Este correo es una notificación de construcción generada automáticamente por Jenkins.</p>
                        <p>Detalles de la construcción:</p>
                        <ul>
                            <li>Nombre del Proyecto: ${env.JOB_NAME}</li>
                            <li>Número de Construcción: ${env.BUILD_NUMBER}</li>
                            <li>Estado de la Construcción: ${currentBuild.currentResult}</li>
                            <li>Para más información, visita: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></li>
                        </ul>
                        <p>¡Gracias!</p>
                    </div>
                </body>
                </html>''',
                mimeType: 'text/html'
            )
        }
    }
}
