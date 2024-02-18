"""Models for Cupcake app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

class Cupcake(db.Model):
    """Cupcake"""
    __tablename__ = 'cupcakes'

    def get_default_image(self):
        return 'https://tinyurl.com/demo-cupcake'
    
    default_image = property(fget=get_default_image)

    id          = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flavor      = db.Column(db.String(70), nullable=False)
    size        = db.Column(db.String(25), nullable=False)
    rating      = db.Column(db.Float, nullable=False)
    image       = db.Column(
                    db.String(2048), 
                    nullable=False,
                    default=get_default_image
                )

    def serialize(self):
        return {
            'id': self.id,
            'flavor': self.flavor,
            'size': self.size,
            'rating': self.rating,
            'image': self.image
            }
    
    def __repr__(self):
        c = self
        return f'<Cupcake flavor={c.flavor} size={c.size} rating={c.rating} image={c.image}>'
