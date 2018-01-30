#!groovy
def err_msg = ""
def repo_name = "demoBackend"
def git_url = "git@github.com:azabustudio/${repo_name}.git"
def release_branch = "master"
def ssh_key_path = '../AzabuStudio.pem'
def payload= parseJson("$payload")
//branch name
def branch = payload.ref.split("/")[2]
def server = ""
if(branch == "master"){
    server = "$production_server"
}else{
    server = "$release_server"
}
def jenkins_home = '/var/jenkins_home'
def deploy_path = '~/claimDemo'
def deploy_port = 8080
def image_name = 'claimdemo'
def version = 'latest'
def container_name = 'claimdemo'

node {
    try {
        stage ("Prepare environment") {
            git branch: "${release_branch}", url: "${git_url}"
            sh "npm install"
        }
        stage ("Code analyse") {
            sh "echo \"Run some lints\""
        }

        stage ("Unit test") {
            sh "echo 'Tests will back'"
        }

        stage ("Build") {
            sh "echo \"do something\""
        }

        stage ("Deploy") {
            sh "rsync -avr -e \"ssh -i ${ssh_key_path}\" ./ centos@${server}:${deploy_path}"
        }

        stage ("build docker image & container"){
            sh "ssh -i ${ssh_key_path} -t centos@${server} \"sudo docker stop ${container_name} || true  \""
            sh "ssh -i ${ssh_key_path} -t centos@${server} \"sudo docker rm ${container_name} || true \""
            sh "ssh -i ${ssh_key_path} -t centos@${server} \"sudo docker rmi ${image_name}:${version} || true \""
            sh "ssh -i ${ssh_key_path} -t centos@${server} \"cd ${deploy_path} && sudo docker build -t ${image_name}:${version} . \""
            sh "ssh -i ${ssh_key_path} -t centos@${server} \"cd ${deploy_path} && sudo docker run --name ${container_name} -p ${deploy_port}:8080 -d ${image_name}:${version} \""
        }
    }catch(e){
        err_msg = "${e}"
        currentBuild.result = "FAILURE"
    }finally{
        if(currentBuild.result != "FAILURE") {
            currentBuild.result = "SUCCESS"
        }
        notification(err_msg)
    }
}

@NonCPS
def parseJson(text) {
    return new groovy.json.JsonSlurperClassic().parseText(text)
}

// 実行結果のSlack通知
def notification(msg) {
    def slack_channel = "#jenkins"  // jenkinsが通知するチャネル
    def slack_domain = "azabustudio"           // slackのドメイン名 https://mydomain.slack.comのmydomainの部分
    def slack_token = "UDOlSE1dKECBCl2ib5xs3rTJ"            // slackのjenkinsプラグインで取得できるtoken
    def slack_color = "good"
    def slack_icon = ""
    def detail_link = "(<${env.BUILD_URL}|Open>)"  // SlackでOpenのアンカーとして表示されます
    // ビルドエラー時にメッセージの装飾を行う
    if(currentBuild.result == "FAILURE") {
        slack_color = "danger"
    }
    def slack_msg = "job ${env.JOB_NAME}[No.${env.BUILD_NUMBER}] was builded ${currentBuild.result}. ${detail_link} \n\n ${msg}"
    slackSend channel: "${slack_channel}", color: "${slack_color}", message: "${slack_msg}", teamDomain: "${slack_domain}", token: "${slack_token}"
}