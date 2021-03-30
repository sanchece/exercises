from unittest import TestCase
from app import app
from models import db, User

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()

class UsersTestCase(TestCase):

    def setUp(self):
        User.query.delete()
        user=User(
            first_name="carlos",
            last_name="sanchez",
            image_url="https://images.unsplash.com/photo-1617074064843-8116e0c14cbc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80")
        db.session.add(user)
        db.session.commit()
        self.user_id=user.id
        self.user=user

    def tearDown(self):
        db.session.rollback()

    def test_users_list(self):
        with app.test_client() as client:
            resp=client.get("/users")
            html=resp.get_data(as_text=True)
            self.assertEqual(resp.status_code,200)
            self.assertIn('<button type="submit" class="btn btn-primary">Add User</button>',html)
            self.assertIn('carlos',html)
    def test_add_user(self):
        with app.test_client() as client:
            resp=client.get("/users/new")
            html=resp.get_data(as_text=True)
            self.assertEqual(resp.status_code,200)
            self.assertIn('<label for="first-name">First Name:</label>',html)
    def test_edit_user(self):
        with app.test_client() as client:
            resp=client.get(f"/users/{self.user_id}/edit")
            html=resp.get_data(as_text=True)
            self.assertEqual(resp.status_code,200)
            self.assertIn('<button href="/users" class="btn btn-primary">Cancel</button>',html)
    def test_user_details(self):
        with app.test_client() as client:
            resp=client.get(f"/users/{self.user_id}")
            html=resp.get_data(as_text=True)
            self.assertEqual(resp.status_code,200)
            self.assertIn('carlos sanchez',html)

    def test_get_user(self):
        user=User.query.get_or_404(self.user_id)
        self.assertEqual(user,self.user)





