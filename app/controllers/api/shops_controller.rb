require 'controller_helper_functions'
require 'controller_helper_shops'

class Api::ShopsController < ApplicationController
  def index
    @query = query_params
    @filter = shop_filters
    begin
      @shops = Shop.where(@filter).custom_query(**@query)
      if @shops.empty?
        render json: ["No search results with filters: #{@filter} nor with the query: #{@query}"], status: 400
      else
        group_ids = @shops.reduce([]){|arr, shop| arr + shop.icon_ids}
        @images = Image.where(group_id: group_ids)
        render json: to_shops_json(shops: @shops, images: @images)
      end
    rescue => e
      puts e.to_s
      render json: { @query.keys.to_s => ["Can't use shop indexing with the given filters: #{@filter} nor with the query: #{@query}"] }, status: 400
    end
  end

  def show
    @shop = Shop.find_by(id: params[:id])
    if @shop
      @images = Image.where(group_id: @shop.icon_ids)
      render json: to_shops_json(shops: [@shop], images: @images)
    else
      render json: ["Could not locate shop id: #{params[:id]}"], status: 400
    end
  end

  def create
    @shop = Shop.create(shop_params)
    if @shop.save
      render json: to_shops_json(shops: [@shop])
    else
      render json: @shop.errors.full_messages, status: 401
    end
  end

  def update
    @shop = Shop.find_by(id: params[:id])
    if @shop && @shop.update_attributes(shop_params)
      render :show
    elsif !@shop
      render json: ["Could not locate shop id: #{params[:id]}"], status: 400
    else
      render json: @shop.errors.full_messages, status: 401
    end
  end

  def destroy
    @shop = Shop.find_by(id: params[:id])
    if @shop && @shop.destroy
      render json: to_shops_json(shops: [@shop])
    elsif !@shop
      render json: ["Could not locate shop id: #{params[:id]}"], status: 400
    else
      render json: @shop.errors.full_messages, status: 401
    end
  end

  def listing
    @query = query_params
    @filter = shop_filters
    begin
      @shops = Shop.where(@filter).custom_query(**@query)
      if @shops.empty?
        render json: ["No search results with filters: #{@filter} nor with the query: #{@query}"], status: 400
      else
        group_ids = @shops.reduce([]){|arr, shop| arr + shop.icon_ids}
        @images = Image.where(group_id: group_ids)
        render json: to_shops_json(shops: @shops, images: @images)
      end
    rescue => e
      puts e.to_s
      render json: { @query.keys.to_s => ["Can't use shop indexing with the given filters: #{@filter} nor with the query: #{@query}"] }, status: 400
    end
  end

  private

  def query_params(body_params=params, **kwargs)
    query = body_params.reject { |k, v| %w[format controller action].include?(k) }
    args = []
    query.each do |k, v|
      if %w[page_number results_per_page listing_active_count num_favorers digital_listing_count start finish limit].include?(k)
        args.push([k.to_sym, ActiveModel::Type::Integer.new.cast(v)])
      elsif %w[price_min price_max].include?(k)
        args.push([k.to_sym, ActiveModel::Type::Decimal.new.cast(v)])
      elsif %w[random].include?(k)
        args.push([k.to_sym, ActiveModel::Type::Boolean.new.cast(!!v ? v : false)])
      elsif %w[icon_ids image_ids].include?(k)
        args.push([k.to_sym, to_array(v)])


      elsif %w[product_ids shop_ids user_ids].include?(k)
        ids = to_array(v).map { |value| ActiveModel::Type::Integer.new.cast(value) }
        args.push([k.to_sym, ids])
      elsif %w[shop_id user_id product_id].include?(k)
        args.push(["#{k}s".to_sym, [ActiveModel::Type::Integer.new.cast(v)]])
      elsif %w[id].include?(k)
        args.push(['product_ids'.to_sym, [ActiveModel::Type::Integer.new.cast(v)]])
      elsif k == 'ids'
        ids = to_array(v).map { |value| ActiveModel::Type::Integer.new.cast(value) }
        args.push(['product_ids'.to_sym, ids])
      else
        args.push([k.to_sym, v])
      end
    end
    args.to_h
  end


  def shop_params(new_params=params, **kwargs)
    # the .require makes it so that when a controller is using the
    # shop_params function, if shop_template doesn't exist in the home_body_template
    # provided by a form, then the controller will not continue
    new_params
      .permit(:shop_name, :title, :user_id, :login_name, :announcement,
              :currency_code, :is_vacation, :vacation_message, :sale_message,
              :digital_sale_message, :listing_active_count, :digital_listing_count,
              :accepts_custom_requests, :custom_shops_state, :policy_welcome,
              :policy_payment, :policy_shipping, :policy_refunds, :policy_additional,
              :policy_seller_info, :policy_has_private_receipt_info, :vacation_autoreply,
              :url, :num_favorers, :languages, :upcoming_local_event_id,
              :is_using_structured_policies, :has_onboarded_structured_policies,
              :has_unstructured_policies, :include_dispute_form_link,
              :is_direct_checkout_onboarded, :policy_privacy, :is_calculated_eligible,
              :is_opted_in_to_buyer_promise, :is_shop_us_based,
              :last_updated_tsz, :creation_tsz, :policy_updated_tsz,
              :image_ids, :icon_ids, :created_at, :updated_at)
  end

  def shop_filters
    query = query_params
    filter = shop_params(query)
    filter[:id] = query[:shop_ids] if query.key?(:shop_ids)
    filter
  end
end
