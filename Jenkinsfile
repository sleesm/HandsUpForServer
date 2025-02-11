pipeline {
    agent any
    environment {
        PROJECT_ID = 'modern-mystery-344103'
        CLUSTER_NAME = 'handsup-k8s'
        LOCATION = 'asia-northeast3-a'
        CREDENTIALS_ID = 'HUCOGKE'
    }
    stages {
        stage("Checkout code") {
            steps {
                checkout scm
            }
        }
        stage("Build image") {
            steps {
                script {
                    myapp = docker.build("project0620/huco:${env.BUILD_ID}")
                }
            }
        }
        stage("Push image") {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'HUCODocekrHub') {
                            myapp.push("latest")
                            myapp.push("${env.BUILD_ID}")
                    }
                }
            }
        }        
        stage('Deploy to GKE') {
			when {
				branch 'main'
			}
            steps{
                // withCredentials([file(credentialsId: 'HUCOGCP', variable: 'HUCOGCP')]) {
                //     sh("gcloud auth activate-service-account --key-file=${HUCOGCP}")
                //     sh("gcloud container clusters get-credentials ${env.CLUSTER_NAME} --zone asia-northeast3-a --project ${env.PROJECT_ID}")
                // }
                sh "sed -i 's/huco:latest/huco:${env.BUILD_ID}/g' deployment.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'deployment.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
            }
        }
    }    
}