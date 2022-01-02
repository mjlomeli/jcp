require 'controller_helper_functions'
require 'controller_helper_shops'

class Api::ShopsController < ApplicationController
  def index
    @query = query_params
    @condition = index_condition
    case @condition
    when SHOP
      fetch_shop
    when SHOPS
      fetch_shops
    when USER_SHOP
      fetch_user_shop
    when SHOP_TITLE
      fetch_shop_title
    when SHOP_NAME
      fetch_shop_name
    else
      if !@query.empty?
        @shop = Shop.where(**@query)
        render json: @shop
      else
        render json: ["Could not use shop indexing with given params: #{@query}"], status: 400
      end
    end
  end

  def show
    @shop = shop_from_params
    if @shop
      render :show
    else
      render json: ["Could not locate shop id: #{params[:id]}"], status: 400
    end
  end

  def create
    #TODO: test creating a shop with browser
    @shop = Shop.new(shop_params)
    if @shop.save
      render json: @shop
    else
      render json: @shop.errors.full_messages, status: 401
    end
  end

  def update
    @shop = shop_from_params
    if @shop && @shop.update_attributes(shop_params)
      render :show
    elsif !@shop
      render json: ["Could not locate shop id: #{params[:id]}"], status: 400
    else
      render json: @shop.errors.full_messages, status: 401
    end
  end

  def destroy
    @shop = shop_from_params
    if @shop && @shop.destroy
      render :show
    elsif !@shop
      render json: ["Could not locate shop id: #{params[:id]}"], status: 400
    else
      render json: @shop.errors.full_messages, status: 401
    end
  end

  private
  SHOP = "SHOP"
  SHOPS = "SHOPS"
  USER_SHOP = "USER_SHOP"
  SHOP_TITLE = "SHOPS_TITLE"
  SHOP_NAME = "SHOPS_NAME"

  def index_condition
    case @query.keys().to_set.hash
    when Set[:shop_id].hash, Set[:id].hash
      condition = SHOP
    when Set[:shop_ids].hash, Set[:ids].hash
      condition = SHOPS
    when Set[:user_id].hash
      condition = USER_SHOP
    when Set[:title].hash
      condition = SHOP_TITLE
    when Set[:shop_name].hash
      condition = SHOP_NAME
    else
      puts "Error: #{@query.keys().to_set} doesn't have a matching condition"
      condition = nil
    end
    condition
  end

  def query_params
    query = params.permit(:id, :ids, :shop_id, :shop_ids, :user_id, :title, :shop_name)
    args = []
    query.each do |k, v|
      if %w[shop_id user_id].include?(k)
        args.push([k.to_sym, ActiveModel::Type::Decimal.new.cast(v)])
      elsif %w[title shop_name].include?(k)
        args.push([k.to_sym, ActiveModel::Type::String.new.cast(v)])
      elsif %w[shop_ids].include?(k)
        args.push([k.to_sym, to_array(v)])
      elsif 'ids' == k
        args.push(['shop_ids'.to_sym, to_array(v)])
      elsif 'id' == k
        args.push(['shop_id'.to_sym, to_array(v)])
      end
    end
    args.to_h
  end

  def shop_params
    # the .require makes it so that when a controller is using the
    # shop_params function, if shop_template doesn't exist in the home_body_template
    # provided by a form, then the controller will not continue
    params.require(:shop).permit(:shop_name, :title, :user_id, :login_name, :announcement, :currency_code, :is_vacation, :vacation_message, :sale_message, :digital_sale_message, :listing_active_count, :digital_listing_count, :accepts_custom_requests, :custom_shops_state, :policy_welcome, :policy_payment, :policy_shipping, :policy_refunds, :policy_additional, :policy_seller_info, :policy_has_private_receipt_info, :vacation_autoreply, :url, :num_favorers, :languages, :upcoming_local_event_id, :is_using_structured_policies, :has_onboarded_structured_policies, :has_unstructured_policies, :include_dispute_form_link, :is_direct_checkout_onboarded, :policy_privacy, :is_calculated_eligible, :is_opted_in_to_buyer_promise, :is_shop_us_based, :results_per_page, :page_number, :last_updated_tsz, :creation_tsz, :policy_updated_tsz, :image_ids, :icon_ids, :created_at, :updated_at)
  end
end
