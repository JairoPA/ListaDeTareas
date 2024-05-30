pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/JairoPA/ListaDeTareas.git'
        BRANCH = 'main'
        RECIPIENT = 'preciadojairo82@gmail.com'
        EMAIL_SUBJECT = "Notificación de Construcción:"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Starting Checkout...'
                git branch: "${env.BRANCH}", url: "${env.REPO_URL}"
                echo 'Checkout complete.'
            }
        }
        stage('Build') {
            steps {
                echo 'Starting Build...'
                // Instalar dependencias
                sh 'npm install'
                sh 'npm test'
                sh 'sudo systemctl start mongod'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Starting Deploy...'
                script {
                    // Lanzar la aplicación en segundo plano
                    sh 'nohup npm start &> app.log &'

                    // Mostrar la URL de la aplicación
                    echo 'La aplicación se está ejecutando en http://localhost:3000'
                    echo 'Por favor, abre este enlace en una nueva ventana o pestaña manualmente.'

                    // Esperar a que el usuario presione el botón
                    input message: 'Presiona el botón para continuar después de que la aplicación se haya iniciado correctamente', submitter: 'admin'

                    // Detener el proceso
                    sh 'pkill -f "node server.js"'
                }
                echo 'Deploy stage complete.'
            }
        }
    }

    post {
        success {
            script {
                sendEmail('SUCCESS')
            }
        }
        failure {
            script {
                sendEmail('FAILURE')
            }
        }
        unstable {
            script {
                sendEmail('UNSTABLE')
            }
        }
        always {
            echo "Pipeline completed"
        }
    }

    def sendEmail(String status) {
        def emailBody = """
            <!DOCTYPE html>
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
                        <li>Nombre del Proyecto: Lista de tareas</li>
                        <li>Número de Construcción: ${env.BUILD_NUMBER}</li>
                        <li>Estado de la Construcción: ${status}</li>
                        <li>Para más información, visita: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></li>
                    </ul>
                    <p>¡Gracias!</p>
                </div>
            </body>
            </html>
        """
        emailext (
            subject: "${EMAIL_SUBJECT} ${status}",
            body: emailBody,
            mimeType: 'text/html',
            to: "${RECIPIENT}",
            replyTo: 'tareadejenkins@gmail.com',
            from: 'tareadejenkins.com'
        )
    }
}
