    pipeline {
        agent any

        environment {
            REPO_URL = 'https://github.com/JairoPA/ListaDeTareas.git'
            BRANCH = 'main'
            RECIPIENT = 'preciadojairo82@gmail.com'
            EMAIL_SUBJECT = "Notificación de Construcción:"
            EMAIL_BODY = '''<!DOCTYPE html>
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
            </html>'''
        }

        stage('Deploy') {
    steps {
        echo 'Starting Deploy...'
        script {
            // Lanzar la aplicación en el primer plano
            def process = sh(script: 'npm start', returnProcess: true)

            // Mostrar la URL de la aplicación
            echo 'La aplicación se está ejecutando en http://localhost:3000'
            
            // Esperar a que el usuario presione el botón
            input message: 'Presiona el botón para continuar después de que la aplicación se haya iniciado correctamente', submitter: 'admin'
            
            // Terminar el proceso una vez que el usuario presiona el botón
            process.interrupt()
        }
        echo 'Deploy stage complete.'
    }
}

    post {
        always {
            // Configurar notificaciones por correo electrónico con contenido HTML
            emailext (
                to: "${env.RECIPIENT}",
                subject: "${env.EMAIL_SUBJECT}",
                body: "${env.EMAIL_BODY}",
                mimeType: 'text/html'
            )
        }
    }
}