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

ActiveRecord::Schema.define(version: 2021_12_26_054628) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cart_items", id: :serial, force: :cascade do |t|
    t.decimal "product_id", null: false
    t.decimal "user_id", null: false
    t.integer "quantity", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id", "user_id"], name: "index_cart_items_on_product_id_and_user_id", unique: true
    t.index ["product_id"], name: "index_cart_items_on_product_id"
    t.index ["user_id"], name: "index_cart_items_on_user_id"
  end

  create_table "images", id: :serial, force: :cascade do |t|
    t.string "data"
    t.string "mimetype"
    t.integer "size"
    t.string "url"
    t.string "encoding"
    t.string "name"
    t.string "group_name", null: false
    t.decimal "group_id", null: false
    t.string "dimension", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["url"], name: "index_images_on_url"
  end

  create_table "products", id: :serial, force: :cascade do |t|
    t.string "title", null: false
    t.float "price", null: false
    t.integer "quantity", default: 1
    t.string "description"
    t.decimal "user_id", null: false
    t.decimal "shop_id", null: false
    t.decimal "image_ids", default: [], array: true
    t.decimal "icon_ids", default: [], array: true
    t.decimal "category_id"
    t.decimal "creation_tsz"
    t.decimal "ending_tsz"
    t.decimal "original_creation_tsz"
    t.decimal "last_modified_tsz"
    t.decimal "state_tsz"
    t.string "state", default: "active"
    t.string "categories", default: [], array: true
    t.string "currency_code"
    t.string "sku", default: [], array: true
    t.string "tags", default: [], array: true
    t.string "materials", default: [], array: true
    t.string "shop_section_id"
    t.string "featured_rank"
    t.string "url"
    t.integer "views", default: 0
    t.integer "num_favorers", default: 0
    t.string "shipping_template_id"
    t.integer "processing_min"
    t.integer "processing_max"
    t.string "who_made"
    t.boolean "is_supply", default: false
    t.string "when_made"
    t.float "item_weight"
    t.string "item_weight_unit", default: "g"
    t.float "item_length"
    t.float "item_width"
    t.float "item_height"
    t.float "item_dimensions_unit", default: 0.0
    t.boolean "is_private", default: false
    t.string "style"
    t.boolean "non_taxable", default: false
    t.boolean "is_customizable", default: false
    t.boolean "is_digital", default: false
    t.string "file_data"
    t.boolean "should_auto_renew", default: false
    t.string "language"
    t.boolean "has_variations"
    t.decimal "taxonomy_id"
    t.string "taxonomy_path", default: [], array: true
    t.boolean "used_manufacturer", default: false
    t.boolean "is_vintage", default: false
    t.integer "results_per_page", default: 100
    t.integer "page_number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shop_id"], name: "index_products_on_shop_id"
    t.index ["user_id"], name: "index_products_on_user_id"
  end

  create_table "reviews", id: :serial, force: :cascade do |t|
    t.decimal "product_id", null: false
    t.decimal "user_id", null: false
    t.integer "rating", null: false
    t.string "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id", "user_id"], name: "index_reviews_on_product_id_and_user_id", unique: true
    t.index ["product_id"], name: "index_reviews_on_product_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "shops", id: :serial, force: :cascade do |t|
    t.string "shop_name", null: false
    t.string "title"
    t.decimal "user_id", null: false
    t.string "login_name"
    t.string "announcement"
    t.string "currency_code"
    t.boolean "is_vacation", default: false
    t.string "vacation_message"
    t.string "sale_message"
    t.string "digital_sale_message"
    t.integer "listing_active_count", default: 0
    t.integer "digital_listing_count", default: 0
    t.boolean "accepts_custom_requests", default: false
    t.integer "custom_shops_state"
    t.string "policy_welcome"
    t.string "policy_payment"
    t.string "policy_shipping"
    t.string "policy_refunds"
    t.string "policy_additional"
    t.string "policy_seller_info"
    t.boolean "policy_has_private_receipt_info", default: false
    t.string "vacation_autoreply"
    t.string "url"
    t.integer "num_favorers", default: 0
    t.string "languages", default: [], array: true
    t.integer "upcoming_local_event_id"
    t.boolean "is_using_structured_policies", default: false
    t.boolean "has_onboarded_structured_policies", default: false
    t.boolean "has_unstructured_policies", default: false
    t.boolean "include_dispute_form_link", default: false
    t.boolean "is_direct_checkout_onboarded", default: true
    t.string "policy_privacy"
    t.boolean "is_calculated_eligible", default: false
    t.boolean "is_opted_in_to_buyer_promise", default: false
    t.boolean "is_shop_us_based", default: false
    t.integer "results_per_page", default: 100
    t.integer "page_number"
    t.decimal "last_updated_tsz"
    t.decimal "creation_tsz"
    t.decimal "policy_updated_tsz"
    t.decimal "image_ids", default: [], array: true
    t.decimal "icon_ids", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shop_name"], name: "index_shops_on_shop_name", unique: true
    t.index ["user_id"], name: "index_shops_on_user_id", unique: true
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "email", null: false
    t.string "session_token", null: false
    t.string "password_digest", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "username"
    t.string "phone"
    t.string "bio"
    t.decimal "image_ids", default: [], array: true
    t.decimal "icon_ids", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email"
    t.index ["password_digest"], name: "index_users_on_password_digest"
    t.index ["session_token"], name: "index_users_on_session_token"
  end

end
