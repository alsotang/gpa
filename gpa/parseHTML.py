#coding=utf8
from gpa.BeautifulSoup import BeautifulSoup
from django.utils import simplejson as json
import gpa.login as login
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
import cgi

def parseHTML(HTMLdata):#分析抓取来的选课系统的已修课程页面
    try:
        required_data = [] #分组后的数据。13个一小组(因为13个刚好就是一行数据），很多小组组成一大组。数据都是python标准str类型。

        soup = BeautifulSoup(''.join(HTMLdata))

        required_table = soup.findAll('table', 'table_biankuan')[0] #抽取出必修课的table
        required_raw = required_table.findAll('td', 'td_biaogexian')#从上table中取出所有的tb_biaogexian条目
        required_raw = [unicode(i.p.string or '') for i in required_raw] #把上述条目的数据类型转换为python标准str
        for i in range(len(required_raw)//13): #将required_raw 的数据13个一小组进行划分，并按小组加入required_data中。
            t_tuple = required_raw[i*13:i*13+13]
            required_data.append(t_tuple)
    except:
        return "error"

    return json.dumps(required_data) #返回json格式的数据。

class generate(webapp.RequestHandler):
    def post(self):
        stuid = cgi.escape(self.request.get('stuid'))
        pwd = cgi.escape(self.request.get('pwd'))
        self.response.out.write(parseHTML(login.login(stuid, pwd)))

    def get(self):
        stuid = cgi.escape(self.request.get('stuid'))
        pwd = cgi.escape(self.request.get('pwd'))
        if((not stuid) or (not pwd)):
            self.response.out.write("POST 或 GET 学号和密码到这个页面，页面会返回JSON格式的已修课程数据。")
            self.response.out.write("<p>")
            self.response.out.write("学号name为stuid，密码name为pwd。\
                                    <p>\
                                    如需更多帮助，请按‘0’转人工服务 or 联系 i@fxck.it。\
                                    ")
        else:
            self.response.headers.add_header("Cache-Control", "must-revalidate")
            self.response.out.write(parseHTML(login.login(stuid, pwd)))





application = webapp.WSGIApplication(
                                     [('/getJSONData', generate)] #输出json格式的数据
                                        
                                     )
def main():
    run_wsgi_app(application)

if __name__ == '__main__':
    main()
