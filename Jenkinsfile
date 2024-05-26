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
                    /* Intentar copiar archivos, verificando permisos y ruta
                    script {
                        try {
                            sh 'mkdir -p /tmp/jenkins_descargas'
                            sh 'cp -r * /tmp/jenkins_descargas'
                            echo 'Archivos copiados a /tmp/jenkins_descargas'
                        } catch (Exception e) {
                            echo 'Error al copiar archivos: ' + e.toString()
                            currentBuild.result = 'FAILURE'
                            error('Falló la copia de archivos.')
                        }
                    }

                    // Ejecutar pruebas y capturar salida en caso de error
                    script {
                        try {
                            def testOutput = sh(script: 'npm test', returnStatus: true, returnStdout: true).trim()
                            if (testOutput.contains("Error:")) {
                                echo "Las pruebas fallaron con el siguiente error:\n${testOutput}"
                                currentBuild.result = 'UNSTABLE'
                            } else {
                                echo "Resultado de las pruebas:\n${testOutput}"
                            }
                        } catch (Exception e) {
                            echo 'Error al ejecutar pruebas: ' + e.toString()
                            currentBuild.result = 'FAILURE'
                        }
                    }
                    echo 'Build stage complete.'*/
                }
            }
            stage('Deploy') {
                steps {
                    echo 'Starting Deploy...'
                    script {
                        // Navegar al directorio de la aplicación
                        /*dir('/tmp/jenkins_descargas') {
                            // Verificar el estado de MongoDB
                            def status = sh(script: 'which mongod', returnStatus: true)

                            // Si MongoDB no está instalado, instalarlo
                            if (status != 0) {
                                sh 'sudo apt-get update && sudo apt-get install -y mongodb'
                                sh 'sudo systemctl start mongod'
                            } else {
                                sh 'sudo systemctl start mongod'
                                // Esperar a que MongoDB esté listo para aceptar conexiones
                                // Iniciar la aplicación en segundo plano
                                sh 'npm start &'

                                // Esperar a que la aplicación se inicie completamente
                                sleep(30)

                                // Verificar si la aplicación está disponible
                                def appStatus = sh(script: 'curl -IsS http://localhost:3000 | head -n 1', returnStatus: true)
                                if (appStatus == 0) {
                                    echo 'La aplicación está disponible en http://localhost:3000'
                                } else {
                                    echo 'La aplicación no se inició correctamente'
                                    currentBuild.result = 'FAILURE'
                                }
                            }
                        }*/
                    sh 'npm start &'
                    echo 'https://localhost:3000'
                }
                }
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
