

--
-- Table structure for table `admin_meta`
--

CREATE TABLE `admin_meta` (
  `name` varchar(50) NOT NULL,
  `value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin_meta`
--

INSERT INTO `admin_meta` (`name`, `value`) VALUES
('paypal_email', '');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `category_id` int(11) NOT NULL,
  `sub_category_id` int(11) NOT NULL,
  `link` text NOT NULL,
  `downloads` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `image` text NOT NULL,
  `descc` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `name`, `category_id`, `sub_category_id`, `link`, `downloads`, `price`, `image`, `descc`) VALUES
(3, 'المتنبى ف الفصحي', 1, 2, 'http://google.com', 5, 10, '', ''),
(4, 'المتنبى ف الفصحي', 1, 2, 'http://google.com', 5, 10, '', ''),
(5, 'المتنبى ف الفصحي', 1, 2, 'http://google.com', 5, 10, '', ''),
(6, 'المتنبى ف الفصحي', 1, 2, 'http://google.com', 5, 10, '', ''),
(7, 'المتنبى ف الفصحي', 1, 2, 'http://google.com', 5, 10, '', ''),
(8, 'المتنبى ف الفصحي', 1, 2, 'http://google.com', 5, 10, '', ''),
(9, 'المتنبى ف الفصحي', 1, 2, 'http://google.com', 5, 10, '', ''),
(10, 'المتنبى ف الفصحي', 1, 2, 'http://google.com', 5, 10, '', ''),
(11, 'المتنبى ف الفصحي', 1, 2, 'http://google.com', 5, 10, '', ''),
(12, 'المتنبى ف الفصحي', 1, 2, 'http://google.com', 5, 10, '', ''),
(13, 'المتنبى ف الفصحي', 1, 2, 'http://google.com', 5, 10, '', ''),
(14, 'المتنبى ف الفصحي', 1, 2, 'http://google.com', 5, 10, '', ''),
(15, 'المتنبى ف الفصحي', 1, 2, 'http://google.com', 5, 10, '', ''),
(16, 'المتنبى ف الفصحي', 1, 2, 'http://google.com', 5, 10, '', ''),
(17, 'المتنبى ف الفصحي', 1, 2, 'http://google.com', 5, 10, '', ''),
(18, 'المتنبى ف الفصحي', 1, 2, 'http://google.com', 5, 10, '', ''),
(19, 'المتنبى ف الفصحي', 1, 2, 'http://google.com', 5, 10, '', ''),
(20, 'المتنبى ف الفصحي', 1, 2, 'http://google.com', 5, 10, '', ''),
(21, 'المتنبى ف الفصحي', 1, 2, 'http://google.com', 5, 10, '', ''),
(22, 'aaa', 0, 0, 'books/0.6858965634742721.jpg', 0, 0, 'images/0.685896563474272.jpg', 'aaaa');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'cat1'),
(2, 'cat2'),
(3, 'newcat3');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `method` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `book_id`, `method`, `status`) VALUES
(1, 1, 3, 1, 2),
(2, 1, 4, 0, 1),
(3, 1, 5, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `stars` int(11) NOT NULL,
  `review` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `screenshots`
--

CREATE TABLE `screenshots` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `book_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sub_categories`
--

CREATE TABLE `sub_categories` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `parent_category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sub_categories`
--

INSERT INTO `sub_categories` (`id`, `name`, `parent_category_id`) VALUES
(1, 's3', 3),
(2, 's2', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `address` text NOT NULL,
  `currency` int(11) NOT NULL,
  `rule` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `country`, `address`, `currency`, `rule`) VALUES
(1, 'admin', 'admin', 'admin', 'Egypt', '8 Mile', 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `screenshots`
--
ALTER TABLE `screenshots`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `screenshots`
--
ALTER TABLE `screenshots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;COMMIT;


