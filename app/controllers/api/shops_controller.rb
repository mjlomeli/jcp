class Api::ShopsController < ApplicationController
  def index
    query_args = query_params
    if !query_args.empty?
      #TODO: query searches
      @shops = Shop.first
    else
      @shops = shop_range(**range_params)
    end
    render :index
  end

  def show
    @shop = Shop.find_by(id: params[:id])
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
      render :show
    elsif !@shop
      render json: ["Could not locate shop id: #{params[:id]}"], status: 400
    else
      render json: @shop.errors.full_messages, status: 401
    end
  end

  private
  def query_params
    integer_data = %w[id user_id listing_active_count digital_listing_count custom_shops_state num_favorers upcoming_local_event_id results_per_page page_number last_updated_tsz creation_tsz policy_updated_tsz start]
    string_data = %w[shop_name title login_name announcement currency_code vacation_message sale_message digital_sale_message policy_welcome policy_payment policy_shipping policy_refunds policy_additional policy_seller_info vacation_autoreply url languages policy_privacy]
    bool_data = %w[is_vacation accepts_custom_requests policy_has_private_receipt_info is_using_structured_policies has_onboarded_structured_policies has_unstructured_policies include_dispute_form_link is_direct_checkout_onboarded is_calculated_eligible is_opted_in_to_buyer_promise is_shop_us_based]

    permitted_params = params.permit(:shop_name, :title, :user_id, :login_name, :announcement, :currency_code, :is_vacation, :vacation_message, :sale_message, :digital_sale_message, :listing_active_count, :digital_listing_count, :accepts_custom_requests, :custom_shops_state, :policy_welcome, :policy_payment, :policy_shipping, :policy_refunds, :policy_additional, :policy_seller_info, :policy_has_private_receipt_info, :vacation_autoreply, :url, :num_favorers, :languages, :upcoming_local_event_id, :is_using_structured_policies, :has_onboarded_structured_policies, :has_unstructured_policies, :include_dispute_form_link, :is_direct_checkout_onboarded, :policy_privacy, :is_calculated_eligible, :is_opted_in_to_buyer_promise, :is_shop_us_based, :results_per_page, :page_number, :last_updated_tsz, :creation_tsz, :policy_updated_tsz, :image_ids, :icon_ids, :created_at, :updated_at, :query)
    args = []
    permitted_params.each do |k, v|
      if integer_data.include?(k)
        args.push([k, ActiveModel::Type::Decimal.new.cast(v)])
      elsif string_data.include?(k)
        args.push([k, ActiveModel::Type::String.new.cast(v)])
      elsif bool_data.include?(k)
        args.push([k, ActiveModel::Type::Boolean.new.cast(v)])
      elsif ['query'].include?(k)
        args.push([k, ActiveModel::Type::String.new.cast(v)])
      elsif ['image_ids', 'icon_ids'].include?(k)
        string_array = ActiveModel::Type::String.new.cast(v)
        args.push([k, JSON.parse(string_array)])
      end
    end
    args.to_h
  end

  def shop_params
    # the .require makes it so that when a controller is using the
    # shop_params function, if shop_template doesn't exist in the body_template
    # provided by a form, then the controller will not continue
    params.require(:shop).permit(:shop_name, :title, :user_id, :login_name, :announcement, :currency_code, :is_vacation, :vacation_message, :sale_message, :digital_sale_message, :listing_active_count, :digital_listing_count, :accepts_custom_requests, :custom_shops_state, :policy_welcome, :policy_payment, :policy_shipping, :policy_refunds, :policy_additional, :policy_seller_info, :policy_has_private_receipt_info, :vacation_autoreply, :url, :num_favorers, :languages, :upcoming_local_event_id, :is_using_structured_policies, :has_onboarded_structured_policies, :has_unstructured_policies, :include_dispute_form_link, :is_direct_checkout_onboarded, :policy_privacy, :is_calculated_eligible, :is_opted_in_to_buyer_promise, :is_shop_us_based, :results_per_page, :page_number, :last_updated_tsz, :creation_tsz, :policy_updated_tsz, :image_ids, :icon_ids, :created_at, :updated_at)
  end

  def range_params
    args = params.permit(:start, :finish, :random, :limit, :format)

    random = ActiveModel::Type::Boolean.new.cast(!!args[:random] ? args[:random] : false)
    start = ActiveModel::Type::Integer.new.cast(args[:start])
    finish = ActiveModel::Type::Integer.new.cast(args[:finish])
    limit = ActiveModel::Type::Integer.new.cast(args[:limit])

    start = !!start ? start.to_i : 0
    finish = !!finish ? finish.to_i : Shop.count
    limit = !!limit ? limit.to_i : finish - start

    { start: start, finish: finish, limit: limit, random: random }
  end

  def shop_range(start: nil, finish: nil, limit: nil, random: false)
    shops = Shop.offset(start).limit(finish - start)
    if random
      randoms = []
      while randoms.length < limit
        offset = rand(shops.count)
        randoms.append(shops.offset(offset).first)
      end
      randoms
    else
      shops.limit(limit)
    end
  end
end
