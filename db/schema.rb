# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_11_22_040502) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cart_items", force: :cascade do |t|
    t.integer "product_id", null: false
    t.integer "quantity", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id", "user_id"], name: "index_cart_items_on_product_id_and_user_id", unique: true
    t.index ["product_id"], name: "index_cart_items_on_product_id"
    t.index ["user_id"], name: "index_cart_items_on_user_id"
  end

  create_table "orders", force: :cascade do |t|
    t.integer "order_id", null: false
    t.integer "product_id", null: false
    t.integer "user_id", null: false
    t.integer "quantity", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["order_id", "product_id", "user_id"], name: "index_orders_on_order_id_and_product_id_and_user_id", unique: true
    t.index ["order_id"], name: "index_orders_on_order_id"
    t.index ["product_id"], name: "index_orders_on_product_id"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "products_list", force: :cascade do |t|
    t.string "title", null: false
    t.float "price", null: false
    t.integer "quantity", default: 1
    t.integer "views", default: 0
    t.integer "num_favorers", default: 0
    t.string "description", null: false
    t.string "image_urls", null: false
    t.string "category"
    t.string "tags"
    t.integer "user_id", null: false
    t.integer "store_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_products_on_user_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.integer "product_id", null: false
    t.integer "user_id", null: false
    t.integer "rating", null: false
    t.string "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id", "user_id"], name: "index_reviews_on_product_id_and_user_id", unique: true
    t.index ["product_id"], name: "index_reviews_on_product_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "stores", force: :cascade do |t|
    t.string "shop_name", null: false
    t.string "title"
    t.integer "user_id", null: false
    t.string "icon_url"
    t.string "medium_image"
    t.string "announcement"
    t.string "sale_message"
    t.string "policy_welcome"
    t.string "policy_payment"
    t.string "policy_shipping"
    t.string "policy_refunds"
    t.integer "num_favorers", default: 0
    t.string "listing_active_count", default: "0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shop_name"], name: "index_stores_on_shop_name", unique: true
    t.index ["user_id"], name: "index_stores_on_user_id", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "session_token", null: false
    t.string "password_digest", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "username"
    t.string "image_url"
    t.string "bio"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email"
    t.index ["password_digest"], name: "index_users_on_password_digest"
    t.index ["session_token"], name: "index_users_on_session_token"
  end

end
