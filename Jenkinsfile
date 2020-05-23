pipeline {
  agent any
  stages {
    stage('') {
      steps {
        sh '''echo helloworld
'''
        timestamps() {
          echo '???'
        }

      }
    }
    stage('post build') {
      steps {
        mail(subject: '1', body: '1', bcc: '1', cc: '1', charset: '1', from: '1', mimeType: '1', replyTo: '1', to: '1')
      }
    }
  }
}