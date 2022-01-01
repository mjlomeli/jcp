class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  validates :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  attr_reader :password
  after_initialize :ensure_session_token

  has_one :shop,
          foreign_key: :user_id,
          class_name: :Shop

  has_many :cart_items,
           foreign_key: :user_id,
           class_name: :CartItem

  has_many :reviews,
           foreign_key: :user_id,
           class_name: :Review

  has_many :products,
           through: :shop,
           source: :products

  has_many :reference_favorites,
           foreign_key: :user_id,
           class_name: :Favorite

  has_many :favorites,
           through: :reference_favorites,
           source: :Product

  def images
    imgs = self.image_ids.map {|image_id| Image.where(group_id: image_id, group_name: 'user')}
    imgs.select {|img| !img.nil?}
  end

  def icons
    imgs = self.icon_ids.map {|icon_id| Image.where(group_id: icon_id, group_name: 'user')}
    imgs.select {|img| !img.nil?}
  end

  def cart_price
    # reduced the (N+1) query
    cart_items = self.cart_items.includes(:product)
    total = 0
    cart_items.each do |item|
      total += item.item_price
    end
    total
  end

  def order_price
    # reduced the (N+1) query
    orders = self.orders.includes(:product)
    total = 0
    orders.each do |item|
      total += item.item_price
    end
    total
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    puts "returned: #{user}"
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save
    self.session_token
  end
end
