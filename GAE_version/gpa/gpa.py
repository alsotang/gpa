from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext.webapp import template
import os



class returnHTML(webapp.RequestHandler):

  def get(self):
    directory = os.path.dirname(__file__)
    path = os.path.join(directory, 'templates', 'gpa.html')
    self.response.out.write(template.render(path,{}))




application = webapp.WSGIApplication(
                                     [('/gpa', returnHTML),
                                      ('/.*', returnHTML), 
                                     ]
                                     )

def main():
  run_wsgi_app(application)

if __name__ == "__main__":
  main()

