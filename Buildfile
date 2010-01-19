# ===========================================================================
# Project:   Yclouds
# Copyright: ©2010 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
config :all, :required => :sproutcore

# CORE FRAMEWORKS
config :scui, :required => [:sproutcore, :'scui/drawing', :'scui/linkit']

config :yclouds do |C|
    c[:required] = [:sproutcore, :scui]
end
