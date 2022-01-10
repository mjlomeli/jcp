module ActiveRecord
  ## Monkey Patching the Array from the relations
  class Relation

    def some_ids
      # Ex. Product.all.some_ids
      self.first
    end

    def paginate(page_number: 1, results_per_page: self.count, **kwargs)
      index = (page_number - 1) * results_per_page
      self.offset(index).limit(results_per_page)
    end

    def has_any(record: items)
      # Product.has_any({tags: [1,2,3,4]})
      self.where("'#{t}' = any (#{self.to_s})")
    end

  end
end

class ApplicationRecord < ActiveRecord::Base
  # Monkey Patching the ApplicationRecord
  self.abstract_class = true

  def self.QUERY_EXAMPLE
    {:product_ids=>[0.1133338728e10, 0.1147559603e10, 0.1147271903e10, 0.1147316747e10, 0.1133338986e10], :group_name=>"product", :page_number=>1, :results_per_page=>2}
  end

  #Ex. Product.monkey_foo
  def self.monkey_foo
    self.first
  end

  def self.paginate(page_number: 1, results_per_page: self.count, **kwargs)
    index = (page_number - 1) * results_per_page
    self.offset(index).limit(results_per_page)
  end

end