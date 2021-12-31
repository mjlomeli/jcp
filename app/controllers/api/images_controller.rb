require 'json'

class Api::ImagesController < ApplicationController
  def index
    query_args = query_params
    if !query_args.empty?
      @images = Image.where(**query_params)
    else
      @images = Image.all
    end
    render json: @images
  end

  def show
    @image = image_from_params
    if @image
      render json: @image
    else
      render json: ["Could not locate image id: #{params[:id]}"], status: 400
    end
  end

  def create
    @image = Image.new(image_params)
    if @image.save
      render :show
    else
      render json: @image.errors.full_messages, status: 401
    end
  end

  def update
    @image = image_from_params
    if @image && @image.update_attributes(image_params)
      render :show
    elsif !@image
      render json: ["Could not locate image id: #{params[:id]}"], status: 400
    else
      render json: @image.errors.full_messages, status: 401
    end
  end

  def destroy
    @image = image_from_params
    if @image && @image.destroy
      render :show
    elsif !@image
      render json: ["Could not locate image id: #{params[:id]}"], status: 400
    else
      render json: @image.errors.full_messages, status: 401
    end
  end

  private

  def query_params
    args = []
    params.permit(:id, :dimension, :group_name, :group_id).each do |k, v|
      if ['id', 'group_id'].include?(k)
        args.push([k, ActiveModel::Type::Decimal.new.cast(v)])
      elsif ['group_name', 'dimension'].include?(k)
        args.push([k, ActiveModel::Type::String.new.cast(v)])
      end
    end
    args.to_h
  end

  def image_from_params
    image_id = Integer(params[:image_id]) rescue nil #converts to integer on fail set to nil
    return nil unless !!image_id
    Image.find_by(id: image_id)
  end

  def image_params
    # the .require makes it so that when a controller is using the
    # image_params function, if image_template doesn't exist in the home_body_template
    # provided by a form, then the controller will not continue
    params.require(:image)
          .permit(:data, :mimetype, :size, :url, :encoding, :name, :group_name,
                  :group_id, :dimension, :created_at, :updated_at)
  end

end
